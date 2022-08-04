import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedAddressEntity1659510164894 implements MigrationInterface {
    name = 'AddedAddressEntity1659510164894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "address_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "line1" character varying NOT NULL, "aline2" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "pin_code" character varying NOT NULL, CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY ("address_id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_6b8e7c75fe60bcf09f309687ba5" UNIQUE ("address_address_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_6b8e7c75fe60bcf09f309687ba5" FOREIGN KEY ("address_address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_6b8e7c75fe60bcf09f309687ba5"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_6b8e7c75fe60bcf09f309687ba5"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_address_id"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
