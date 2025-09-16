package com.leverx.projectmanagement.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<String> handleInvalidEnumValue(IllegalArgumentException ex) {
    return ResponseEntity.badRequest().body("Invalid project status provided.");
  }
}
