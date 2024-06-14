package main

import (
	"errors"
	"math"
)

func sumDifficulty(tasks []Task) float64 {
	totalDifficulty := 0.0
	for _, task := range tasks {
		totalDifficulty += float64(task.Difficulty)
	}
	return totalDifficulty
}

func (s Schedule) findDayOfTaskByTitle(title string) (int, error) {
	for dayNumber, day := range s.Genes {
		if day.containsTaskByTitle(title) {
			return dayNumber, nil
		}
	}

	return -1, errors.New("no task with title: " + title)
}

func (d Day) containsTaskByTitle(title string) bool {
	for _, task := range d.Tasks {
		if task.Title == title {
			return true
		}
	}
	return false
}

// reward based on Gaussian function
func gaussianReward(difficultyForDay, averageDifficultyPerDay float64) float64 {
	distance := difficultyForDay - averageDifficultyPerDay
	sigma := 1.7 /* set your desired sigma value */
	exponent := -0.07 * (distance / sigma) * (distance / sigma)
	return math.Exp(exponent)
}
