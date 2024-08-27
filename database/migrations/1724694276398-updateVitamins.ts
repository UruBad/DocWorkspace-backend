import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateVitamins1724694276398 implements MigrationInterface {
  name = 'UpdateVitamins1724694276398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`vitamins\` ADD \`userId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`vitamins\` ADD CONSTRAINT \`FK_32324dc736f8d3166c050d365b7\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`vitamins\` DROP FOREIGN KEY \`FK_32324dc736f8d3166c050d365b7\``,
    );
    await queryRunner.query(`ALTER TABLE \`vitamins\` DROP COLUMN \`userId\``);
  }
}
