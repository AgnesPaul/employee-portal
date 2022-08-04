import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedAddressEntity1659510233310 implements MigrationInterface {
    name = 'UpdatedAddressEntity1659510233310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "aline2" TO "line2"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "line2" TO "aline2"`);
    }

}
