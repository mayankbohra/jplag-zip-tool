@echo off

set "JPLAG_JAR=C:\Users\Mayank\Desktop\college\sem-7\TA\jplag-zip-tool\api\scripts\jplag.jar"
set "SUBMISSION_DIR=C:\Users\Mayank\Desktop\college\sem-7\TA\jplag-zip-tool\api\uploads"
set "RESULT_DIR=C:\Users\Mayank\Desktop\college\sem-7\TA\jplag-zip-tool\api\results"
set "LANGUAGE=java"

java -jar "%JPLAG_JAR%" -l %LANGUAGE% "%SUBMISSION_DIR%" -r "%RESULT_DIR%\result"