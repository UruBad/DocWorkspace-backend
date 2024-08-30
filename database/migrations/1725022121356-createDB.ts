import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDB1725022121356 implements MigrationInterface {
  name = 'CreateDB1725022121356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`prescriptions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`breakfast\` varchar(255) NULL, \`brunch\` varchar(255) NULL, \`lunch\` varchar(255) NULL, \`vitaminId\` int NULL, \`doctorPatientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`doctor-patient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted\` tinyint NOT NULL DEFAULT 0, \`doctorId\` int NULL, \`patientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`refresh_token\` varchar(255) NULL, \`deleted\` tinyint NOT NULL DEFAULT 0, \`role\` enum ('patient', 'doctor', 'admin') NOT NULL DEFAULT 'patient', UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`vitamins\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`image\` varchar(255) NULL, \`link\` varchar(255) NULL, \`deleted\` tinyint NOT NULL DEFAULT 0, \`doctorId\` int NULL, UNIQUE INDEX \`IDX_d7e3e7b4f2dbb266cfd0baab2b\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` ADD CONSTRAINT \`FK_4ce5aa9ffa70e87003ac2a37b15\` FOREIGN KEY (\`vitaminId\`) REFERENCES \`vitamins\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` ADD CONSTRAINT \`FK_b48e3b3c660a4ec1913244cd055\` FOREIGN KEY (\`doctorPatientId\`) REFERENCES \`doctor-patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor-patient\` ADD CONSTRAINT \`FK_5aad0b472b0ab0d56d9923c2b6e\` FOREIGN KEY (\`doctorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor-patient\` ADD CONSTRAINT \`FK_c9f0f20295c50779930cfe869d8\` FOREIGN KEY (\`patientId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vitamins\` ADD CONSTRAINT \`FK_1ef04ceae58ff666ee4850234ab\` FOREIGN KEY (\`doctorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`vitamins\` DROP FOREIGN KEY \`FK_1ef04ceae58ff666ee4850234ab\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor-patient\` DROP FOREIGN KEY \`FK_c9f0f20295c50779930cfe869d8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor-patient\` DROP FOREIGN KEY \`FK_5aad0b472b0ab0d56d9923c2b6e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` DROP FOREIGN KEY \`FK_b48e3b3c660a4ec1913244cd055\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prescriptions\` DROP FOREIGN KEY \`FK_4ce5aa9ffa70e87003ac2a37b15\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d7e3e7b4f2dbb266cfd0baab2b\` ON \`vitamins\``,
    );
    await queryRunner.query(`DROP TABLE \`vitamins\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`doctor-patient\``);
    await queryRunner.query(`DROP TABLE \`prescriptions\``);
  }
}
