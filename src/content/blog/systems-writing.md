---
title: "writing compilation pipelines in rust"
date: 2026-06-21
description: "lessons learned from constructing recursive descent parsers and implementing static analysis passes in rust's type system."
thumbnail: ""
---

writing compilers is notoriously hard, but rust's strong algebraic type system makes it a joy. this log discusses some strategies for structuring compiler codebases.

### 1. Representing the AST

using rust's `enum` to define AST nodes is highly expressive:

```rust
enum Expr {
    Literal(Literal),
    Binary {
        op: Op,
        left: Box<Expr>,
        right: Box<Expr>,
    },
    Variable(String),
}
```

using `Box` is necessary because Rust enums must have a known size at compile time.

### 2. Static Analysis and Lifetimes

typechecking is where compiler logic gets complex. i recommend separating the AST representation from the typed AST (TAST). this avoids complex lifetimes and keeps the passes decoupled.
