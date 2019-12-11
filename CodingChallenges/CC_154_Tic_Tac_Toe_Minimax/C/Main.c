#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define DRAW 'DRAW'
#define PLAYER_1 'X'
#define PLAYER_2 'O'

char hardMoves, current = PLAYER_1, next = PLAYER_2;

int minimax( void *spots, int depth, int isMaximizing )
{
	char result = game_over( spots );
	if( result != 0 )
	{
		if( result == DRAW ) return 0;
		if( result == PLAYER_1 ) return -10 + depth;
		if( result == PLAYER_2 ) return 10 - depth;
	}

	char* board = (char*)spots;
	if( isMaximizing )
	{
		int i, bestScore = -1 * 0xf;
		for( i = 0; i < 9; i++ )
		{
			if( board[i] == '\0' )
			{
				board[i] = PLAYER_2;
				int score = minimax( spots, depth + 1, 0 );
				board[i] = '\0';

				if( score > bestScore )
				{
					bestScore = score;
				}
			}
		}
		return bestScore;
	}

	int i, bestScore = 0xfffffff;
	for( i = 0; i < 9; i++ )
	{
		if( board[i] == '\0' )
		{
			board[i] = PLAYER_1;
			int score = minimax( spots, depth + 1, 1 );
			board[i] = '\0';

			if( score < bestScore )
			{
				bestScore = score;
			}
		}
	}
	return bestScore;
}

void *best_move( void *spots )
{
	char *board = (char*)spots;
	int bestScore = -1 * 0xf, move = -1, i;
	for( i = 0; i < 9; i++ )
	{
		if( board[i] == '\0' )
		{
			board[i] = PLAYER_2;
			int score = minimax( spots, 0, 0 );
			board[i] = '\0';
			if( score > bestScore )
			{
				bestScore = score;
				move = i;
			}
		}
	}

	if( move < 0 ) return board;
	board[move] = PLAYER_2;
	return board;
}

void *random_move( void *spots, int isP1 )
{
	char *board = (char*)spots;
	int i, index = -1, available[9] = { -1, -1, -1, -1, -1, -1, -1, -1, -1 };
	for( i = 0; i < 9; i++ )
	{
		if( board[i] == '\0' )
		{
			available[++index] = i;
		}
	}

	if( index == -1 )
	{
		return board;
	}

	index = ( index == 0 ) ? 0 : rand() % index;
	board[available[index]] = isP1 ? PLAYER_1 : PLAYER_2;
	return board;
}

void *computer_turn( void *spots )
{
	if( hardMoves == 'n' )
	{
		return random_move( spots, 0 );
	}
	return best_move( spots );
}

int game_over( void *spots )
{
	int i, j;
	char *board = (char*)spots;

	int combos[8][3] = {
		{ 0, 1, 2 }, { 3, 4, 5 }, { 6, 7, 8 },
		{ 0, 3, 6 }, { 1, 4, 7 }, { 2, 5, 8 },
		{ 0, 4, 8 }, { 2, 4, 6 }
	};

	for( i = 0; i < 8; i++ )
	{
		char a = board[combos[i][0]];
		char b = board[combos[i][1]];
		char c = board[combos[i][2]];

		if( a == b && b == c )
		{
			if( a != '\0' && b != '\0' && c != '\0' )
			{
				return a;
			}
		}
	}

	for( i = 0; i < 9; i++ )
	{
		if( board[i] == '\0' )
		{
			return 0;
		}
	}

	return DRAW;
}

void *player_turn( void *spots )
{
	int spot = 0;
	char *board = (char*)spots;
	printf( "Pick a spot [1-9]: " );
	scanf_s( "%d", &spot );

	if( board[spot - 1] != '\0' )
	{
		printf( "Spot already taken, try again.\n" );
		return player_turn( spots );
	}

	board[spot - 1] = PLAYER_1;
	return board;
}

void print_board( void *board )
{
	char *spots = (char*)board;

	char c0 = ( spots[0] == '\0' ) ? '-' : spots[0];
	char c1 = ( spots[1] == '\0' ) ? '-' : spots[1];
	char c2 = ( spots[2] == '\0' ) ? '-' : spots[2];

	char c3 = ( spots[3] == '\0' ) ? '-' : spots[3];
	char c4 = ( spots[4] == '\0' ) ? '-' : spots[4];
	char c5 = ( spots[5] == '\0' ) ? '-' : spots[5];

	char c6 = ( spots[6] == '\0' ) ? '-' : spots[6];
	char c7 = ( spots[7] == '\0' ) ? '-' : spots[7];
	char c8 = ( spots[8] == '\0' ) ? '-' : spots[8];

	printf( "  %c | %c | %c\n", c0, c1, c2 );
	printf( "-------------\n" );
	printf( "  %c | %c | %c\n", c3, c4, c5 );
	printf( "-------------\n" );
	printf( "  %c | %c | %c\n", c6, c7, c8 );
	printf( "\n" );
}

int main( void )
{
	srand( time( NULL ) );

	printf( "Minimax Mode? [y/n]: " );
	scanf_s( "%c", &hardMoves );

	char *board = (char*)calloc( 9, sizeof( char ) );
	if( board == NULL ) { return -1; }

	char go = 0;
	while( go == 0 )
	{
		print_board( board );
		board = player_turn( board );
		go = game_over( board );
		
		if( go )
		{
			break;
		}

		print_board( board );
		board = computer_turn( board );
		go = game_over( board );
	}

	printf( "\n" );
	if( go == DRAW )
	{
		printf( "Draw!\n" );
	}
	else
	{
		printf( "'%c' Wins\n", go );
	}

	print_board( board );

	free( board );
	system( "PAUSE" );
	return 0;
}
