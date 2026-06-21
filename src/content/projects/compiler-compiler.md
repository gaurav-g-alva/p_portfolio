---
title: Dashboard on Customer Churn
description: a custom compiler for a subset of golang written in rust,
  outputting optimized x86-64 assembly with register allocation.
link: https://github.com/alexcarter/chiron
skills:
  - "Tableau "
  - SQL
  - Power Bi
  - Python
thumbnail: images/testscoregraph.png
---

### Project Overview

chiron is an experimental programming language compiler that compiles a structured subset of Go into executable machine code for the x86-64 architecture. The main objective was to understand compiler optimization and learn low-level code generation from first principles.

### Key Implementation Details

1. **Parser & Lexer**: Built from scratch using recursive descent without standard lexer generator libraries.
2. **Typechecker**: Fully type-safe semantics checking, verifying static rules, scopes, and variable shadowing.
3. **Optimizations**: Performs Constant Folding, Dead Code Elimination, and Common Subexpression Elimination on intermediate representation (SSA form).
4. **Register Allocation**: Uses Graph Coloring Register Allocation to map arbitrary variables to virtual registers.
