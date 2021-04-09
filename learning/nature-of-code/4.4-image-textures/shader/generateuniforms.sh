#!/bin/bash

# Particle Systems with Image Textures (Shader (WEBGL))
# The Nature of Code
# The Coding Train / Daniel Shiffman / Dusk
# https://youtu.be/pUhv2CA0omA
# https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html

# Texture Maker: https://editor.p5js.org/codingtrain/sketches/NS4rB1Yx-
# Image Texture: https://editor.p5js.org/codingtrain/sketches/TTVoNt58T
# Shader (WEBGL): https://editor.p5js.org/codingtrain/sketches/EXZmcc4m_

i=0
until [ $i -ge $1 ]; do
  echo uniform vec3 particle$i\;
  let i+=1
done

i=0
until [ $i -ge $1 ]; do
  echo particles[$i] = particle$i\;
  let i+=1
done