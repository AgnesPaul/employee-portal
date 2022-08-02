import {MigrationInterface, QueryRunner} from "typeorm";

export class dateOfJoining1659418052242 implements MigrationInterface {
    name = 'dateOfJoining1659418052242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "doj" TO "date_of_joining"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "date_of_joining" TO "doj"`);
    }

}
