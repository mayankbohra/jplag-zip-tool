#!/bin/bash

# Define variables
JPLAG_JAR="./backend/scripts/jplag.jar"
SUBMISSION_DIR="./backend/uploads"
RESULT_DIR="./backend/results"
LANGUAGE="cpp"

# Run the JPlag command
java -jar "$JPLAG_JAR" -l "$LANGUAGE" "$SUBMISSION_DIR" -r "$RESULT_DIR/result"
