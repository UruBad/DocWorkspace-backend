import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserAndPrescription1725085877023
  implements MigrationInterface
{
  name = 'UpdateUserAndPrescription1725085877023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` CHANGE \`brunch\` \`dinner\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`lastname\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`firstname\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` DROP COLUMN \`dinner\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` ADD \`dinner\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` DROP COLUMN \`dinner\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` ADD \`dinner\` varchar(255) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`firstname\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastname\``);
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` CHANGE \`dinner\` \`brunch\` varchar(255) NULL`,
    );
  }
}
