#!/bin/bash

if ! command -v java &> /dev/null; then
    echo "Java not found. Installing..."
    apt-get update && apt-get install -y openjdk-11-jdk
fi

JPLAG_JAR="./backend/scripts/jplag.jar"
SUBMISSION_DIR="./backend/uploads"
RESULT_DIR="./backend/results"
LANGUAGE="c"

java -jar "$JPLAG_JAR" -l "$LANGUAGE" "$SUBMISSION_DIR" -r "$RESULT_DIR/result"
