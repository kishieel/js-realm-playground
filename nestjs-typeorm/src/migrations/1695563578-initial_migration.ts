import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695203634217 implements MigrationInterface {
    name = 'InitialMigration1695203634217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`document\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`documentReviewers\` (\`userId\` int NOT NULL, \`documentId\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userId\`, \`documentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`documentReviewers\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`documentReviewers\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`documentReviewers\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`documentReviewers\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`CREATE INDEX \`IDX_eccb0e8da7b57e416dfdf7d7e8\` ON \`documentReviewers\` (\`userId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_97778bd6265818f8d457f9c1c9\` ON \`documentReviewers\` (\`documentId\`)`);
        await queryRunner.query(`ALTER TABLE \`document\` ADD CONSTRAINT \`FK_9eac3612452020c976207f37b03\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`documentReviewers\` ADD CONSTRAINT \`FK_eccb0e8da7b57e416dfdf7d7e85\` FOREIGN KEY (\`userId\`) REFERENCES \`document\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`documentReviewers\` ADD CONSTRAINT \`FK_97778bd6265818f8d457f9c1c92\` FOREIGN KEY (\`documentId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`documentReviewers\` DROP FOREIGN KEY \`FK_97778bd6265818f8d457f9c1c92\``);
        await queryRunner.query(`ALTER TABLE \`documentReviewers\` DROP FOREIGN KEY \`FK_eccb0e8da7b57e416dfdf7d7e85\``);
        await queryRunner.query(`ALTER TABLE \`document\` DROP FOREIGN KEY \`FK_9eac3612452020c976207f37b03\``);
        await queryRunner.query(`DROP INDEX \`IDX_97778bd6265818f8d457f9c1c9\` ON \`documentReviewers\``);
        await queryRunner.query(`DROP INDEX \`IDX_eccb0e8da7b57e416dfdf7d7e8\` ON \`documentReviewers\``);
        await queryRunner.query(`ALTER TABLE \`documentReviewers\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`documentReviewers\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`documentReviewers\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`documentReviewers\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`DROP TABLE \`documentReviewers\``);
        await queryRunner.query(`DROP TABLE \`document\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
