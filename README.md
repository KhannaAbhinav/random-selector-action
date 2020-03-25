# Random Selector Action

## Description
Select a random value from a list, dictionary(random key selection) or a numeric range

## Inputs

### data

#### Description

Takes values in following format
1. string representation of a list
2. string representation of a dictionary
3. x..y where x = range start, y = range end; x and y inclusive

#### Required
True

### returnCount

#### Description
Number of Values to return

#### Required
False

#### Default
"1"    

## Outputs

### selectedValuesList
#### Description
gives the list of randomly selected value

### selectedValuesRank:

#### Description
gives the ranked list of randomly selected value in  [rank: value ]; rank starts at 1"
