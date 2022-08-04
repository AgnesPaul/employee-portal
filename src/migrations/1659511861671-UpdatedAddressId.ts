import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedAddressId1659511861671 implements MigrationInterface {
    name = 'UpdatedAddressId1659511861671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_6b8e7c75fe60bcf09f309687ba5"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "address_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" TO "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "address_address_id" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME CONSTRAINT "UQ_6b8e7c75fe60bcf09f309687ba5" TO "UQ_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" TO "UQ_6b8e7c75fe60bcf09f309687ba5"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "address_id" TO "address_address_id"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" TO "PK_db4aae0a059fd4ef7709cb802b0"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "id" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_6b8e7c75fe60bcf09f309687ba5" FOREIGN KEY ("address_address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
