@echo off

set "JPLAG_JAR=./api/scripts/jplag.jar"
set "SUBMISSION_DIR=./api/uploads"
set "RESULT_DIR=./api/results"
set "LANGUAGE=cpp"

java -jar "%JPLAG_JAR%" -l %LANGUAGE% "%SUBMISSION_DIR%" -r "%RESULT_DIR%\result"