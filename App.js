import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert } from 'react-native';
import params from './src/params'
import MineField from './src/Components/MineField'
import Header from './src/Components/Header'
import {
		createMinedBoard,
		cloneBoard,
		openField,
		hasExplosion,
		wonGame,
		showMines,
		invertFlag,
		flagsUsed
	} from './src/functions'

export default class App extends Component {

	constructor(props){
		super(props);
		this.state = this.createState()
	}

  minesAmount = () => {
	  const cols = params.getColumnsAmount()
	  const rows = params.getRowsAmount()
	  return Math.ceil(cols * rows * params.difficutLevel)
  }

  createState = () => {
	  const cols = params.getColumnsAmount()
	  const rows = params.getRowsAmount()

	  return {
			board: createMinedBoard(rows, cols, this.minesAmount()),
			won: false,
			lose: false
	  }
	}
	
	onOpenField = (row, column) => {
			const board = cloneBoard(this.state.board);
			openField(board, row, column);
			const lose = hasExplosion(board);
			const won = wonGame(board);

			if (lose){
					showMines(board);
					Alert.alert('Você perdeu!', 'Tente outra vez');
			}

			if (won){
					Alert.alert('Parabéns', 'Você Venceu');
			}

			this.setState({board, lose, won});
	}

	onSelectField = (row, column) => {
		const board = cloneBoard(this.state.board)
		invertFlag(board, row, column)
		const won = wonGame(board)
	
		if (won) {
		  Alert.alert('Parabéns', 'Você Venceu!')
		}
	
		this.setState({ board, won })
	}

  render() {
    return (
			<View style={styles.container}>
				<Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
					onNewGame={() => this.setState(this.createState())} />
				<View style={styles.board}>
					<MineField board={this.state.board} 
						onOpenField={this.onOpenField} 
						onSelectField={this.onSelectField} />
				</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,		
		justifyContent: 'flex-end'
	},
	board: {
		alignItems: 'center',
		backgroundColor: '#AAA'
	}
});
