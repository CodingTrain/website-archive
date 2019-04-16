enum Axis {
    X {

        void turn(Cubie[] qbs, int selector, int dir) {
            for (int i = 0; i < qbs.length; i++) {
                Cubie qb = qbs[i];
                if (qb.x == selector) {
                    PMatrix2D matrix = new PMatrix2D();
                    matrix.rotate(dir*HALF_PI);
                    matrix.translate(qb.y, qb.z);
                    qb.update(qb.x, round(matrix.m02), round(matrix.m12));
                    qb.turnFacesX(dir);
                }
            }
        }
    }
    , 

    Y {

        void turn(Cubie[] qbs, int selector, int dir) {
            for (int i = 0; i < qbs.length; i++) {
                Cubie qb = qbs[i];
                if (qb.y == selector) {
                    PMatrix2D matrix = new PMatrix2D();
                    matrix.rotate(dir*HALF_PI);
                    matrix.translate(qb.x, qb.z);
                    qb.update(round(matrix.m02), qb.y, round(matrix.m12));
                    qb.turnFacesY(dir);
                }
            }
        }
    }
    , 

    Z {

        void turn(Cubie[] qbs, int selector, int dir) {

            for (int i = 0; i < qbs.length; i++) {
                Cubie qb = qbs[i];
                if (qb.z == selector) {
                    PMatrix2D matrix = new PMatrix2D();
                    matrix.rotate(dir*HALF_PI);
                    matrix.translate(qb.x, qb.y);
                    qb.update(round(matrix.m02), round(matrix.m12), round(qb.z));
                    qb.turnFacesZ(dir);
                }
            }
        }
    }

    ;

    abstract void turn(Cubie[] qbs, int selector, int dir);
}
