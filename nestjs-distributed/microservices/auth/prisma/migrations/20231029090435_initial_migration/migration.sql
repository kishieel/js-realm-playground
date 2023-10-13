-- CreateTable
CREATE TABLE `users` (
    `uuid` VARCHAR(36) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` MEDIUMTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `roleUuid` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rolePermissions` (
    `roleUuid` VARCHAR(36) NOT NULL,
    `permissionUuid` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `rolePermissions_roleUuid_permissionUuid_key`(`roleUuid`, `permissionUuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `permissions_name_key`(`name`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleUuid_fkey` FOREIGN KEY (`roleUuid`) REFERENCES `roles`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rolePermissions` ADD CONSTRAINT `rolePermissions_roleUuid_fkey` FOREIGN KEY (`roleUuid`) REFERENCES `roles`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rolePermissions` ADD CONSTRAINT `rolePermissions_permissionUuid_fkey` FOREIGN KEY (`permissionUuid`) REFERENCES `permissions`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
