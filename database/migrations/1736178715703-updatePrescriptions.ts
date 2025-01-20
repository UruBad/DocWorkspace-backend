import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePrescriptions1736178715703 implements MigrationInterface {
  name = 'UpdatePrescriptions1736178715703';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` DROP COLUMN \`breakfast\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` DROP COLUMN \`lunch\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` DROP COLUMN \`dinner\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\`
          ADD \`appointment\` enum ('breakfast', 'lunch', 'dinner') NOT NULL DEFAULT 'breakfast'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\`
          ADD \`count\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\`
          ADD \`type\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vitamins\` CHANGE \`image\` \`image\` varchar (255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vitamins\` CHANGE \`link\` \`link\` varchar (255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`vitamins\` CHANGE \`link\` \`link\` varchar (255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vitamins\` CHANGE \`image\` \`image\` varchar (255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` DROP COLUMN \`type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` DROP COLUMN \`count\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` DROP COLUMN \`appointment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\`
          ADD \`dinner\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\`
          ADD \`lunch\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\`
          ADD \`breakfast\` varchar(255) NULL`,
    );
  }
}
