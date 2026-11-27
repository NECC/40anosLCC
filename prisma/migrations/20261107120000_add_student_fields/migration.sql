ALTER TABLE "User"
  ADD COLUMN "isStudent" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "studyYear" INTEGER;

ALTER TABLE "User"
  ADD CONSTRAINT "User_student_year_check"
  CHECK (
    ("isStudent" = true AND "studyYear" BETWEEN 1 AND 3)
    OR ("isStudent" = false AND "studyYear" IS NULL)
  );
