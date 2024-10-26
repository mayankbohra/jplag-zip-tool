#!/bin/bash

# Define variables
JPLAG_JAR="./scripts/jplag.jar"
SUBMISSION_DIR="./uploads"
RESULT_DIR="./results"
LANGUAGE="java"

# Run the JPlag command
java -jar "$JPLAG_JAR" -l "$LANGUAGE" "$SUBMISSION_DIR" -r "$RESULT_DIR/result"
