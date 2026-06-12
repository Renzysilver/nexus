-- AlterTable
ALTER TABLE "KnowledgeCard" ADD COLUMN "published" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "KnowledgeCard" ADD COLUMN "authorName" TEXT NOT NULL DEFAULT 'nexus_creator';
