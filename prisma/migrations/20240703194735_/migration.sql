-- CreateTable
CREATE TABLE `Usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `sub` VARCHAR(191) NOT NULL,
    `photoUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuarios_sub_key`(`sub`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classificacoes` (
    `id` VARCHAR(191) NOT NULL,
    `classificacao` INTEGER NOT NULL,
    `autorId` VARCHAR(191) NOT NULL,
    `avaliadoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comentarios` (
    `id` VARCHAR(191) NOT NULL,
    `comentario` VARCHAR(191) NOT NULL,
    `userSub` VARCHAR(191) NOT NULL,
    `trabalhoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trabalhos` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `localizacao` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `valorHora` DOUBLE NOT NULL,
    `servicoId` VARCHAR(191) NOT NULL,
    `usuarioSub` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` VARCHAR(191) NOT NULL,
    `NomeServico` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Classificacoes` ADD CONSTRAINT `Classificacoes_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `Usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classificacoes` ADD CONSTRAINT `Classificacoes_avaliadoId_fkey` FOREIGN KEY (`avaliadoId`) REFERENCES `Usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentarios` ADD CONSTRAINT `Comentarios_userSub_fkey` FOREIGN KEY (`userSub`) REFERENCES `Usuarios`(`sub`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentarios` ADD CONSTRAINT `Comentarios_trabalhoId_fkey` FOREIGN KEY (`trabalhoId`) REFERENCES `Trabalhos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trabalhos` ADD CONSTRAINT `Trabalhos_servicoId_fkey` FOREIGN KEY (`servicoId`) REFERENCES `Categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trabalhos` ADD CONSTRAINT `Trabalhos_usuarioSub_fkey` FOREIGN KEY (`usuarioSub`) REFERENCES `Usuarios`(`sub`) ON DELETE CASCADE ON UPDATE CASCADE;
