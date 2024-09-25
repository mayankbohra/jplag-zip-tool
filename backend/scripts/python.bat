@echo off

set "JPLAG_JAR=./backend/scripts/jplag.jar"
set "SUBMISSION_DIR=./backend/uploads"
set "RESULT_DIR=./backend/results"
set "LANGUAGE=python3"

java -jar "%JPLAG_JAR%" -l %LANGUAGE% "%SUBMISSION_DIR%" -r "%RESULT_DIR%\result"