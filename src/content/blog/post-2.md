---
title: Implementing Neural Networks in Rust
excerpt: We come back to the second video of 3b1b.Last one, we were trying to understand how neutral networks identify patterns by breaking down images into patterns.Then the hidden layer neurons take weights for each of the activation neurons.
publishDate: '22 December 2024'
tags:
  - Guide
seo:
  image:
    src: '/post-1.jpg'
    alt: A person standing at the window
---

# Implementing Neural networks in Rust

- We come back to the second video of 3b1b.
- Last one, we were trying to understand how neutral networks identify patterns by breaking down images into patterns.
- Then the hidden layer neurons take weights for each of the activation neurons.
- Right, but how do we select weights for the neurons?

```
struct ImagesStruct{}

struct ActivationValue{
value u32 //shud be between 0 and 1.
}


struct InputLayer{
activationNeurons [ActivationValue;784]
}

struct OutputValue{
  value u32 //shud be 0,1,2,3,4,5,6,7,8,9
}

struct OutputLayer{
IdentifiedDigit [OutputValue;10]
}

```

- This is the initial code where I have initialised these structs where InputLayer is the first layer of the model.
  - I've initialised it with values such that it should lie between 0.0 and 1.0.

## Issue 1

- I create a `new()` method which checks if it lies in the given range.
- But if the field is public, i can access it and instantiate a value without using the `new()` method, I can still pass out of range values.
- So it's important to keep all these fields private and ensure only the `new()` method can create it and another implemented method only can read the value.

Thus, the code becomes

```


```

- I've used range expressions.
