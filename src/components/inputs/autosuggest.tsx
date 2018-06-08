import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { InputProps } from '@material-ui/core/Input';

const styles = (theme: Theme) => createStyles({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

interface IProps {
	classes: any;
	suggestions: string[];
	value: string;
	changeHandler: (value: string) => void;
	placeholderText?: string;
}

interface ISuggestion {
	label: string;
}

interface IState {
	suggestions: ISuggestion[];
}
/**
 * provides a material wrapper for auto completion
 * using auto-suggest and autosuggest-highlight
 *
 * @class IntegrationAutosuggest
 * @extends {React.Component<IProps, IState>}
 */
class IntegrationAutosuggest extends React.Component<IProps, IState> {
  public state: IState = {
    suggestions: []
	};
	
	private suggestions: ISuggestion[] = this.props.suggestions.map((s) => {
		return {
			label: s
		};
	});

	private inputEl: HTMLInputElement;

	public componentDidMount() {
		this.inputEl.focus();
	}

  public render() {
    const { classes }: any = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={(inputProps: Autosuggest.InputProps<InputProps>) => this.renderInput(inputProps)}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={
					(event: Autosuggest.SuggestionsFetchRequestedParams) => 
						this.handleSuggestionsFetchRequested(event.value)}
        onSuggestionsClearRequested={() => this.handleSuggestionsClearRequested()}
        renderSuggestionsContainer={(event) => this.renderSuggestionsContainer(event)}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={
					(event: ISuggestion,
					params: Autosuggest.RenderSuggestionParams) => 
						this.renderSuggestion(event, params)
				}
				ref={(e: any) => {
					if (e) {
						this.inputEl = e.input;
					}
				}}
        inputProps={{
          classes,
          placeholder: this.props.placeholderText || '',
					value: this.props.value,
          onChange: (event, params: Autosuggest.ChangeEvent) => this.props.changeHandler(params.newValue)
        }}
      />
    );
	}
	
	private handleSuggestionsFetchRequested(value: string) {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  }

  private handleSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

	private renderInput(inputProps: any): JSX.Element {
		const { classes, ref, ...other } = inputProps;
		return (
			<TextField
				fullWidth={true}
				InputProps={{
					inputRef: ref,
					classes: {
						input: classes.input,
					},
					...other
				}}
			/>
		);
	}

	private getSuggestionValue(suggestion: any) {
		return suggestion.label;
	}

	private renderSuggestionsContainer(options:Autosuggest.RenderSuggestionsContainerParams) {
		const { containerProps, children } = options;
	
		return (
			<Paper {...containerProps} square={true}>
				{children}
			</Paper>
		);
	}
	
	private renderSuggestion(
		suggestion: ISuggestion,
		{ query, isHighlighted }:Autosuggest.RenderSuggestionParams): JSX.Element {
		const matches = match(suggestion.label, query);
		const parts = parse(suggestion.label, matches);
	
		return (
			<MenuItem selected={isHighlighted} component="div">
				<div>
					{parts.map((part, index) => {
						return part.highlight ? (
							<span key={String(index)} style={{ fontWeight: 300 }}>
								{part.text}
							</span>
						) : (
							<strong key={String(index)} style={{ fontWeight: 500 }}>
								{part.text}
							</strong>
						);
					})}
				</div>
			</MenuItem>
		);
	}

	private getSuggestions(value: string): ISuggestion[] {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		let count = 0;
	
		return inputLength === 0
			? []
			: this.suggestions.filter(suggestion => {
					const keep =
						count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;
	
					if (keep) {
						count += 1;
					}
	
					return keep;
				});
	}
}

export default withStyles(styles)(IntegrationAutosuggest);
