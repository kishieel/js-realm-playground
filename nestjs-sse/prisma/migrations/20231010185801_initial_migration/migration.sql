-- CreateTable
CREATE TABLE `stocks` (
    `uuid` VARCHAR(36) NOT NULL,
    `symbol` VARCHAR(4) NOT NULL,
    `company` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `stocks_symbol_key`(`symbol`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prices` (
    `uuid` VARCHAR(36) NOT NULL,
    `stockUuid` VARCHAR(36) NOT NULL,
    `price` DOUBLE NOT NULL,
    `pricedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `prices` ADD CONSTRAINT `prices_stockUuid_fkey` FOREIGN KEY (`stockUuid`) REFERENCES `stocks`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
