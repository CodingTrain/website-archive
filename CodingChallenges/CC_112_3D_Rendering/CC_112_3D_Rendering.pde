- title: "3D rendering in the console"
  author: Florian Spulak
    name: "Florian"
    url: "https://www.youtube.com/channel/UC_mtFcnUQN5PlimgFKLeeKg"
  url: 
  source: 

/// includes
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define PI 3.14159265359

/// data structures
typedef struct _vec2
{
    int x;
    int y;
} vec2;

typedef struct _vec3
{
    int x;
    int y;
    int z;
} vec3;

typedef struct _dvec2
{
    double x;
    double y;
} dvec2;

typedef struct _dvec3
{
    double x;
    double y;
    double z;
} dvec3;

/// prototypes
char** genGrid(int x, int y);
void freeGrid(char **grid, int y);
void showGrid (char** grid, int x_max, int y_max);
int printPixel (char** grid, int x_max, int y_max, vec2 pixel, char pen);
int printLine (char** grid, int x_max, int y_max, vec2 endpoint, vec2 startpoint, char pen);
dvec2 projOrthographic (dvec3 point);
void matmulThreeOne (double a[3][3], double b[3][1], double c[3][1]);
dvec3 rotatePoint (dvec3 point, double x, double y, double z);
vec2 dvec2_to_vec2 (dvec2 vec);

char** genGrid(int x, int y)
{
    // this function generates a 2 dim array

    int j = 0;
    char** tmp = NULL;

    tmp = (char**) calloc(y, sizeof(char*));
    if (tmp == NULL)
        return NULL;

    for (j=0; j<y; j++)
    {
        tmp[j] = (char*) calloc(x, sizeof(char));
        if (tmp[j] == NULL)
            return NULL;
    }

    return tmp;
}

void freeGrid(char **grid, int y)
{
    // this function releases the memory of the specified 2 dim array

    int j = 0;

    for (j=0; j<y; j++)
    {
        free(grid[j]);
    }

    free(grid);
}

void showGrid (char** grid, int x_max, int y_max)
{
    // prints specified 2 dim array to the console (stdout)

    int j, i = 0;

    for (j=0; j<y_max; j++)
    {
        for (i=0; i<x_max; i++)
        {
            // spacing ' ' for square format without standardized font
            printf(" %c", grid[j][i]);
        }
        printf("\n");
    }
}

int printPixel (char** grid, int x_max, int y_max, vec2 pixel, char pen)
{
    // this function writes a pixel to the grid
    // out of grid errors are tested and cause the following error code:

    /// error-code 1: out of grid
    if (pixel.x < 0 || pixel.x >= x_max || pixel.y < 0 || pixel.y >= y_max)
        return 1;

    grid[pixel.y][pixel.x] = pen;

    return 0;
}

int printLine (char** grid, int x_max, int y_max, vec2 endpoint, vec2 startpoint, char pen)
{
    // this function prints a line in the specified grid using the BRESENHAM algorithm
    // is a pixel out of the grid, there will be an error code 1 returned but the printing is not interrupted

    vec2 pixel = {0,0};
    int error = 0;
    int error_detected = 0;

    ///BRESENHAM START...
    int x0 = endpoint.x;
    int y0 = endpoint.y;
    int x1 = startpoint.x;
    int y1 = startpoint.y;

    int dx =  abs(x1-x0), sx = x0<x1 ? 1 : -1;
    int dy = -abs(y1-y0), sy = y0<y1 ? 1 : -1;
    int err = dx+dy, e2;

    while(1)
    {
        //das pixel schreiben...
        pixel.x = x0;
        pixel.y = y0;
        error = printPixel(grid, x_max, y_max, pixel, pen);
        // looking for out of bounds error:
        if (error == 1)
        {
            /// out of bound error
            error_detected = 1;
        }
        //---

        if (x0==x1 && y0==y1) break;
        e2 = 2*err;
        if (e2 > dy) { err += dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
    ///...BRESENHAM END

    // return error code_
    if (error_detected == 0)
        return 0;

    return 1;
}

dvec2 projOrthographic (dvec3 point)
{
    dvec2 result = {0.0,0.0};

    double project[2][3] = {
        {1.0, 0.0, 0.0},
        {0.0, 1.0, 0.0},
    };

    double pointMatrix[3][1] = {{0}};
    pointMatrix[0][0] = point.x;
    pointMatrix[1][0] = point.y;
    pointMatrix[2][0] = point.z;

    double resultMatrix[2][1] = {{0}};

    int i = 0;

    for (i=0; i<2; i++)
    {
        int j = 0;

        for (j=0; j<1; j++)
        {
            int k = 0;

            for (k=0; k<3; k++)
            {
                resultMatrix[i][j] += project[i][k] * pointMatrix[k][j];
            }
        }
    }

    result.x = resultMatrix[0][0];
    result.y = resultMatrix[1][0];

    return result;
}

void matmulThreeOne (double a[3][3], double b[3][1], double c[3][1])
{
    int i = 0;

    for (i=0; i<3; i++)
    {
        int j = 0;

        for (j=0; j<1; j++)
        {
            int k = 0;

            c[i][j] = 0;
            for (k=0; k<3; k++)
            {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }
}

dvec3 rotatePoint (dvec3 point, double x, double y, double z)
{
    dvec3 result = {0.0,0.0,0.0};

    double rX[3][3] = {{0}};
    double rY[3][3] = {{0}};
    double rZ[3][3] = {{0}};

    double pointMatrix[3][1] = {{0}};
    pointMatrix[0][0] = point.x;
    pointMatrix[1][0] = point.y;
    pointMatrix[2][0] = point.z;

    double sX = sin(x);
    double cX = cos(x);

    double sY = sin(y);
    double cY = cos(y);

    double sZ = sin(z);
    double cZ = cos(z);

    rX[0][0]=1;
                rX[1][1]=cX; rX[1][2]=-sX;
                rX[2][1]=sX; rX[2][2]=cX;


    rY[0][0]=cY;             rY[0][2]=sY;
                rY[1][1]=1;
    rY[2][0]=-sY;           rY[2][2]=cY;


    rZ[0][0]=cZ; rZ[0][1]=-sZ;
    rZ[1][0]=sZ; rZ[1][1]=cZ;
                            rZ[2][2]=1;

    double temp[3][1] = {{0}};

    if (x != 0.0)
    {
        matmulThreeOne(rX, pointMatrix, temp);

        pointMatrix[0][0] = temp[0][0];
        pointMatrix[1][0] = temp[1][0];
        pointMatrix[2][0] = temp[2][0];
    }

    if (y != 0.0)
    {
        matmulThreeOne(rY, pointMatrix, temp);

        pointMatrix[0][0] = temp[0][0];
        pointMatrix[1][0] = temp[1][0];
        pointMatrix[2][0] = temp[2][0];
    }

    if (z != 0.0)
    {
        matmulThreeOne(rZ, pointMatrix, temp);

        pointMatrix[0][0] = temp[0][0];
        pointMatrix[1][0] = temp[1][0];
        pointMatrix[2][0] = temp[2][0];
    }


    result.x = temp[0][0];
    result.y = temp[1][0];
    result.z = temp[2][0];

    return result;
}

vec2 dvec2_to_vec2 (dvec2 vec)
{
    vec2 result;

    result.x = round(vec.x);
    result.y = round(vec.y);

    return result;
}

int main()
{
 // define a cube around 0,0,0
    dvec3 cube[8] = {
        {-0.5, 0.5, -0.5},
        {-0.5, 0.5, 0.5},
        {0.5, 0.5, 0.5},
        {0.5, 0.5, -0.5},
        {-0.5, -0.5, -0.5},
        {-0.5, -0.5, 0.5},
        {0.5, -0.5, 0.5},
        {0.5, -0.5, -0.5}
    };

    while (1)
    {
        char** grid = genGrid(24, 24);

        //project the cube into 2D
        dvec2 proj_cube[8];
        int i = 0;
        for (i=0; i<8; i++)
        {
            proj_cube[i] = projOrthographic(cube[i]);

            proj_cube[i].x *= 10;
            proj_cube[i].x += 10;
            proj_cube[i].y *= 10;
            proj_cube[i].y += 10;

            cube[i] = rotatePoint(cube[i], PI/20, PI/40, PI/80);
        }

        printLine(grid, 24, 24, dvec2_to_vec2(proj_cube[1]), dvec2_to_vec2(proj_cube[0]), '*');
        printLine(grid, 24, 24, dvec2_to_vec2(proj_cube[2]), dvec2_to_vec2(proj_cube[1]), '*');
        printLine(grid, 24, 24, dvec2_to_vec2(proj_cube[3]), dvec2_to_vec2(proj_cube[2]), '*');
        printLine(grid, 24, 24, dvec2_to_vec2(proj_cube[0]), dvec2_to_vec2(proj_cube[3]), '*');

        printLine(grid, 24, 24, dvec2_to_vec2(proj_cube[4]), dvec2_to_vec2(proj_cube[0]), '+');
        printLine(grid, 24, 24, dvec2_to_vec2(proj_cube[5]), dvec2_to_vec2(proj_cube[1]), '+');
        printLine(grid, 24, 24, dvec2_to_vec2(proj_cube[6]), dvec2_to_vec2(proj_cube[2]), '+');
        printLine(grid, 24, 24, dvec2_to_vec2(proj_cube[7]), dvec2_to_vec2(proj_cube[3]), '+');

        printLine(grid, 24, 24, dvec2_to_vec2(proj_cube[5]), dvec2_to_vec2(proj_cube[4]), '*');
        printLine(grid, 24, 24, dvec2_to_vec2(proj_cube[6]), dvec2_to_vec2(proj_cube[5]), '*');
        printLine(grid, 24, 24, dvec2_to_vec2(proj_cube[7]), dvec2_to_vec2(proj_cube[6]), '*');
        printLine(grid, 24, 24, dvec2_to_vec2(proj_cube[4]), dvec2_to_vec2(proj_cube[7]), '*');

        for (i=0; i<8; i++)
        {
            printPixel(grid, 24, 24, dvec2_to_vec2(proj_cube[i]), '#');
        }

        showGrid(grid, 24, 24);

        freeGrid(grid, 24);

        system("pause");
        system("cls");
    }


    /*
    dvec3 a = {-0.5, 0.5, -0.5};
    dvec3 b = {-0.5, 0.5, 0.5};
    dvec3 c = {0.5, 0.5, 0.5};
    dvec3 d = {0.5, 0.5, -0.5};
    dvec3 e = {-0.5, -0.5, -0.5};
    dvec3 f = {-0.5, -0.5, 0.5};
    dvec3 g = {0.5, -0.5, 0.5};
    dvec3 h = {0.5, -0.5, -0.5};
    */

    /*
    dvec3 testA = {1,-1,1};

    dvec3 res = rotatePoint(testA, PI/2, PI/2, PI/2);

    printf("%f\n%f\n%f", res.x, res.y, res.z);
    */

    /*
    double testA[3][3] = {
    {2, 22, 0},
    {1, 3, 0.5},
    {5, 5, 58}
};

double testB[3][1] = {
    {1},
    {55},
    {1}
};
double testC[3][1] = {
    {563.3},
    {45.3},
    {3.3}
};

    matmulThreeOne(testA, testB, testC);

   int i, j;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 1; j++) {
            printf("%f ", testC[i][j]);
        }
        printf("\n");
    }
    */

    /*
    vec2 pointA = {0,0};
    vec2 pointB = {10,0};
    vec2 pointC = {10,10};
    vec2 pointD = {0,10};

    char** grid = genGrid(20, 20);

    printLine(grid, 20, 20, pointB, pointA, '#');
    printLine(grid, 20, 20, pointC, pointA, '#');
    printLine(grid, 20, 20, pointD, pointA, '#');
    showGrid(grid, 20, 20);
    */

    return 0;
}
