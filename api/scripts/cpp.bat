@echo off

set "JPLAG_JAR=C:\Users\Mayank\Desktop\college\sem-7\TA\jplag-zip-tool\backend\scripts\jplag.jar"
set "SUBMISSION_DIR=C:\Users\Mayank\Desktop\college\sem-7\TA\jplag-zip-tool\backend\uploads"
set "RESULT_DIR=C:\Users\Mayank\Desktop\college\sem-7\TA\jplag-zip-tool\backend\results"
set "LANGUAGE=cpp"

java -jar "%JPLAG_JAR%" -l %LANGUAGE% "%SUBMISSION_DIR%" -r "%RESULT_DIR%\result"