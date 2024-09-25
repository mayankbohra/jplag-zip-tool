#!/bin/bash

# Log the Java version
echo "Checking Java installation..."
/usr/bin/java -version >> /tmp/java_version.log 2>&1

# Define variables
JPLAG_JAR="./backend/scripts/jplag.jar"
SUBMISSION_DIR="./backend/uploads"
RESULT_DIR="./backend/results"
LANGUAGE="c"

# Run the JPlag command
java -jar "$JPLAG_JAR" -l "$LANGUAGE" "$SUBMISSION_DIR" -r "$RESULT_DIR/result"
