package main

import (
	"errors"
	"github.com/hamza-aloglu/GeneticAlgo-Go/src"
	"math/rand"
	"reflect"
)

type ScheduleModel struct {
	src.PermutationModel
}

func (sm ScheduleModel) Crossover(parent1 src.Individual, parent2 src.Individual) (src.Individual, error) {
	// Map of tasks for each parent: task -> day number. Sorted by task.
	// When selecting tasks for child, look at each task and randomly choose one and insert it into child' relevant day.
	parent1Schedule := parent1.(*Schedule)
	parent2Schedule := parent2.(*Schedule)
	tasksByDayParent1 := createTasksByDay(parent1Schedule)
	tasksByDayParent2 := createTasksByDay(parent2Schedule)

	apiInput := populateApiInput(parent1Schedule)
	child := generateSchedule(apiInput)
	for _, task := range parent1Schedule.Tasks {
		if rand.Float64() <= 0.5 {
			child.Genes[tasksByDayParent1[task.Title]].Tasks = append(child.Genes[tasksByDayParent1[task.Title]].Tasks, task)
		} else {
			child.Genes[tasksByDayParent2[task.Title]].Tasks = append(child.Genes[tasksByDayParent2[task.Title]].Tasks, task)
		}
	}

	return child, nil
}

// Mutate is swap mutation implementation
func (sm ScheduleModel) Mutate(individual src.Individual) (src.Individual, error) {
	individualReflection := reflect.ValueOf(individual)
	ptrFlag := false
	if individualReflection.Kind() == reflect.Ptr {
		// Dereference the pointer to get the struct
		individualReflection = individualReflection.Elem()
		ptrFlag = true
	}
	genes := individualReflection.FieldByName("Genes")
	if genes.Kind() != reflect.Slice {
		return nil, errors.New("genes field is not a slice")
	}
	// Pick two random 2 genes and swap their positions
	pos1, pos2 := rand.Intn(genes.Len()), rand.Intn(genes.Len())
	tmp := genes.Index(pos1).Interface()
	genes.Index(pos1).Set(genes.Index(pos2))
	genes.Index(pos2).Set(reflect.ValueOf(tmp))

	if ptrFlag {
		return individualReflection.Addr().Interface().(src.Individual), nil
	}
	return individualReflection.Interface().(src.Individual), nil
}

func createTasksByDay(schedule *Schedule) map[string]int {
	tasksByDay := make(map[string]int, len(schedule.Tasks))
	for _, task := range schedule.Tasks {
		dayOftask, err := schedule.findDayOfTaskByTitle(task.Title)
		if err != nil {
			panic(err)
		}
		tasksByDay[task.Title] = dayOftask
	}

	return tasksByDay
}
