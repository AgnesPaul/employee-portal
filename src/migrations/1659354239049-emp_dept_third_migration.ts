import {MigrationInterface, QueryRunner} from "typeorm";

export class empDeptThirdMigration1659354239049 implements MigrationInterface {
    name = 'empDeptThirdMigration1659354239049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "created_at"`);
    }

}
