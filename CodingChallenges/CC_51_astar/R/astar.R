# A* algorithm.
# Based on this pseudocode: https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode

aStar <- function(start, goal, distanceMatrix, heuristic) {
  # Check that distance matric is square
  dims <- dim(distanceMatrix)
  if (dims[1] != dims[2]) {
    print("Distance matrix must be square.")
    return(c())
  }
  n <- dims[1]
  
  closedSet <- c()
  openSet <- c(start)
  cameFrom <- rep(0, n)
  gScore <- rep(Inf, n)
  gScore[start] <- 0
  fScore <- rep(Inf, n)
  fScore[start] <- heuristic(start, goal)
  
  while (length(openSet) != 0) {
    fScoreInOpenSet <- fScore * sapply(1:n, function(i) {
      if (i %in% openSet) 1 else Inf
    })
    current <- which.min(fScoreInOpenSet)
    if (current == goal) {
      return(reconstructPath(cameFrom, current))
    }
    openSet <- openSet[openSet != current]
    closedSet <- c(closedSet, current)
    
    neighbors <- which(distanceMatrix[current,] != Inf)
    for (neighbor in neighbors) {
      if (neighbor %in% closedSet) {
        next
      }
      if (!(neighbor %in% openSet)) {
        openSet <- c(openSet, neighbor)
      }
      tentative_gScore <- gScore[current] + distanceMatrix[current, neighbor]
      if (tentative_gScore >= gScore[neighbor]) {
        next
      }
      cameFrom[neighbor] <- current
      gScore[neighbor] <- tentative_gScore
      fScore[neighbor] <- gScore[neighbor] + heuristic(neighbor, goal) 
    }
  }
  print("No solution.")
  return(c())
}

reconstructPath <- function(cameFrom, current) {
  total_path <- c(current)
  while (current != 0) {
    current <- cameFrom[current]
    if (current != 0) {
      total_path <- c(current, total_path)
    }
  }
  return (total_path)
}
