import * as tf from '@tensorflow/tfjs-node';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { inspect } from 'util';

const DATA_DIR = './data';
const NUM_CLASSES = getNumClasses(DATA_DIR);
const IMAGE_SIZE = 100;

function getNumClasses(dir: string): number {
    return fs.readdirSync(dir).filter(subdir => fs.statSync(path.join(dir, subdir)).isDirectory()).length;
}

async function preprocessImage(imagePath: string) {
    const imageBuffer = fs.readFileSync(imagePath);
    const image = tf.node.decodeImage(imageBuffer, 3); // Load image with 3 channels (RGB)
    const resizedImage = tf.image.resizeBilinear(image, [IMAGE_SIZE, IMAGE_SIZE]);
    const normalizedImage = resizedImage.div(255.0);
    image.dispose();
    resizedImage.dispose();
    return normalizedImage;
}

async function loadAndPreprocessData() {
    const classDirs = fs.readdirSync(DATA_DIR).filter(subdir => fs.statSync(path.join(DATA_DIR, subdir)).isDirectory());

    const allImages: tf.Tensor[] = [];
    const allLabels: number[] = [];

    for (let classIndex = 0; classIndex < classDirs.length; classIndex++) {
        const classDir = classDirs[classIndex];
        const classPath = path.join(DATA_DIR, classDir);
        const imageFiles = fs.readdirSync(classPath).filter(file => file.endsWith('.png')); // Update with your image file extension

        for (const imageFile of imageFiles) {
            const imagePath = path.join(classPath, imageFile);
            const imageTensor = await preprocessImage(imagePath);
            allImages.push(imageTensor);
            allLabels.push(classIndex);
        }
    }

    const shuffledIndices = tf.util.createShuffledIndices(allImages.length);
    const shuffledImages = [...shuffledIndices].map(i => allImages[i]);
    const shuffledLabels = [...shuffledIndices].map(i => allLabels[i]);

    const imagesTensor = tf.stack(shuffledImages);
    const labelsTensor = tf.oneHot(tf.tensor1d(shuffledLabels, 'int32'), NUM_CLASSES);

    return { images: imagesTensor, labels: labelsTensor };
}

function buildModel() {
    const model = tf.sequential();

    model.add(tf.layers.conv2d({
        inputShape: [IMAGE_SIZE, IMAGE_SIZE, 3],
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling',
    }));
    model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));
    model.add(tf.layers.conv2d({
        kernelSize: 5,
        filters: 16,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling',
    }));
    model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({ units: NUM_CLASSES, activation: 'softmax', kernelInitializer: 'varianceScaling' }));

    return model;
}

async function trainModel(model: tf.Sequential) {
    const { images, labels } = await loadAndPreprocessData();

    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });

    return await model.fit(images, labels, {
        epochs: 12,
        batchSize: 16,
        validationSplit: 0.1,
        shuffle: true,
    });
}

async function saveModel(model: tf.Sequential, accuracy: number) {
    const now = new Date();
    await model.save(`file://./models/${now.getTime() + '_ac' + accuracy}`);

}

function printConfusionMatrix(model: tf.Sequential, images: any, labels: any) {
    const classDirs = fs.readdirSync(DATA_DIR).filter(subdir => fs.statSync(path.join(DATA_DIR, subdir)).isDirectory());

    const predictions = model.predict(images) as tf.Tensor;
    const predictedLabels = predictions.argMax(1) as tf.Tensor1D;
    const trueLabels = labels.argMax(1) as tf.Tensor1D;

    const confusionMatrix = tf.math.confusionMatrix(trueLabels, predictedLabels, NUM_CLASSES);

    console.log('Confusion Matrix:');
    console.log('Actual \\ Predicted');
    console.log('-------------------');

    function formatNumber(num: number) {
        return num.toString().padStart(3, ' ');
    }

    for (let i = 0; i < NUM_CLASSES; i++) {
        const row = confusionMatrix.slice([i, 0], [1, NUM_CLASSES]);
        const rowData = Array.from(row.dataSync()).map(formatNumber).join(',');
        console.log(`${classDirs[i].padEnd(15)} ${rowData}`);
    }
}

async function main() {
    const { images, labels } = await loadAndPreprocessData();
    const model = await buildModel();
    const result = await trainModel(model);
    const accuracy = Math.floor(result.history['val_acc'].slice(-1) as unknown as number * 100);
    await saveModel(model, accuracy);
    printConfusionMatrix(model, images, labels);
}

main().catch(console.error);
