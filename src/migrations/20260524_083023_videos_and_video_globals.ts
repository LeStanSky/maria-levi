import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_videos_usage" AS ENUM('hero', 'about-bts', 'services-showcase', 'portfolio');
  CREATE TYPE "public"."enum_videos_niche" AS ENUM('personal-brand', 'portrait', 'model-tests', 'commercial');
  CREATE TYPE "public"."enum_videos_orientation" AS ENUM('vertical', 'horizontal', 'square');
  CREATE TABLE "videos_usage" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_videos_usage",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"poster_id" integer,
  	"niche" "enum_videos_niche",
  	"orientation" "enum_videos_orientation",
  	"silent" boolean DEFAULT true,
  	"credit_photographer" varchar DEFAULT 'Maria Levi',
  	"display_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "videos_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"portfolio_series_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "videos_id" integer;
  ALTER TABLE "about_page" ADD COLUMN "bts_video_id" integer;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_bts_video_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "hero_video_id" integer;
  ALTER TABLE "videos_usage" ADD CONSTRAINT "videos_usage_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_rels" ADD CONSTRAINT "videos_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_rels" ADD CONSTRAINT "videos_rels_portfolio_series_fk" FOREIGN KEY ("portfolio_series_id") REFERENCES "public"."portfolio_series"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "videos_usage_order_idx" ON "videos_usage" USING btree ("order");
  CREATE INDEX "videos_usage_parent_idx" ON "videos_usage" USING btree ("parent_id");
  CREATE INDEX "videos_poster_idx" ON "videos" USING btree ("poster_id");
  CREATE INDEX "videos_updated_at_idx" ON "videos" USING btree ("updated_at");
  CREATE INDEX "videos_created_at_idx" ON "videos" USING btree ("created_at");
  CREATE UNIQUE INDEX "videos_filename_idx" ON "videos" USING btree ("filename");
  CREATE INDEX "videos_rels_order_idx" ON "videos_rels" USING btree ("order");
  CREATE INDEX "videos_rels_parent_idx" ON "videos_rels" USING btree ("parent_id");
  CREATE INDEX "videos_rels_path_idx" ON "videos_rels" USING btree ("path");
  CREATE INDEX "videos_rels_portfolio_series_id_idx" ON "videos_rels" USING btree ("portfolio_series_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_bts_video_id_videos_id_fk" FOREIGN KEY ("bts_video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_bts_video_id_videos_id_fk" FOREIGN KEY ("version_bts_video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_video_id_videos_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("videos_id");
  CREATE INDEX "about_page_bts_video_idx" ON "about_page" USING btree ("bts_video_id");
  CREATE INDEX "_about_page_v_version_version_bts_video_idx" ON "_about_page_v" USING btree ("version_bts_video_id");
  CREATE INDEX "site_settings_hero_video_idx" ON "site_settings" USING btree ("hero_video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "videos_usage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "videos_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "videos_usage" CASCADE;
  DROP TABLE "videos" CASCADE;
  DROP TABLE "videos_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_videos_fk";
  
  ALTER TABLE "about_page" DROP CONSTRAINT "about_page_bts_video_id_videos_id_fk";
  
  ALTER TABLE "_about_page_v" DROP CONSTRAINT "_about_page_v_version_bts_video_id_videos_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_hero_video_id_videos_id_fk";
  
  DROP INDEX "payload_locked_documents_rels_videos_id_idx";
  DROP INDEX "about_page_bts_video_idx";
  DROP INDEX "_about_page_v_version_version_bts_video_idx";
  DROP INDEX "site_settings_hero_video_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "videos_id";
  ALTER TABLE "about_page" DROP COLUMN "bts_video_id";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_bts_video_id";
  ALTER TABLE "site_settings" DROP COLUMN "hero_video_id";
  DROP TYPE "public"."enum_videos_usage";
  DROP TYPE "public"."enum_videos_niche";
  DROP TYPE "public"."enum_videos_orientation";`)
}
