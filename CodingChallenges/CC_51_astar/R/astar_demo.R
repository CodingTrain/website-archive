source("astar.R")

d <- matrix(Inf, nrow = 100, ncol = 100)

huller <- sample(2:99, 25)

for (x in 1:10) {
  for (y in 0:9) {
    p <- x + 10 * y
    if (!(p %in% huller)) {
      if (x > 1 & (!(p - 1) %in% huller)) {
        d[p, p - 1] <- 1
      }
      if (x < 10 & (!(p + 1) %in% huller)) {
        d[p, p + 1] <- 1
      }
      if (y > 0 & (!(p - 10) %in% huller)) {
        d[p, p - 10] <- 1
      }
      if (y < 9 & (!(p + 10) %in% huller)) {
        d[p, p + 10] <- 1
      }
    }
  }
}

manhattan <- function(a, b) {
  xa <- a %% 10
  if (xa == 0) {
    xa <- 10
  }
  ya <- a %/% 10
  xb <- b %% 10
  if (xb == 0) {
    xb <- 10
  }
  yb <- b %/% 10
  abs(xa - xb) + abs(ya - yb)
}

euclidean <- function(a, b) {
  xa <- a %% 10
  if (xa == 0) {
    xa <- 10
  }
  ya <- a %/% 10
  xb <- b %% 10
  if (xb == 0) {
    xb <- 10
  }
  yb <- b %/% 10
  sqrt((xa - xb) ^ 2 + (ya - yb) ^ 2)
}

tegn <- function(solution) {
  for (j in 0:9) {
    streng <- ""
    for (i in 1:10) {
      p <- i + 10 * j
      if (p %in% huller) {
        streng <- paste0(streng, "O")
      } else if (p %in% solution) {
        streng <- paste0(streng, "+")
      } else {
        streng <- paste0(streng, ".")
      }
    }
    print(streng)
  }
}


print("No diagonals (Heuristic: Manhattan distance)")
print("")
s <- aStar(1, 100, d, manhattan)
tegn(s)

print("")

# Add diagonals
for (x in 1:10) {
  for (y in 0:9) {
    p <- x + 10 * y
    if (!(p %in% huller)) {
      if (x > 1 & y > 0 & (!(p - 11) %in% huller)) {
        d[p, p - 11] <- sqrt(2)
      }
      if (x < 10 & y > 0 & (!(p - 9) %in% huller)) {
        d[p, p - 9] <- sqrt(2)
      }
      if (x > 1 & y < 9 & (!(p + 9) %in% huller)) {
        d[p, p + 9] <- sqrt(2)
      }
      if (x < 10 & y < 9 & (!(p + 11) %in% huller)) {
        d[p, p + 11] <- sqrt(2)
      }
    }
  }
}

print("With diagonals (Heuristic: Euclidean distance)")
print("")
s <- aStar(1, 100, d, euclidean)
tegn(s)
