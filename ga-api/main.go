package main

import (
	"encoding/json"
	"fmt"
	"github.com/hamza-aloglu/GeneticAlgo-Go/src"
	"math"
	"math/rand"
	"net/http"
	"os"
	"time"
)

/*
* This api will accept date interval, tasks, parameters of genetic algorithm features.
* It will return the best possible schedule of the given tasks between the given date interval.
 */

type ApiInput struct {
	ScheduleStartDate    time.Time `json:"scheduleStartDate"`
	ScheduleEndDate      time.Time `json:"scheduleEndDate"`
	Tasks                []Task    `json:"tasks"`
	IsDeadlineMustMeet   bool      `json:"isDeadlineMustMeet"`
	IsParentTaskMustMeet bool      `json:"isParentTaskMustMeet"`

	WeightPriority   float64 `json:"weightPriority"`
	WeightDifficulty float64 `json:"weightDifficulty"`
	WeightDeadline   float64 `json:"weightDeadline"`
	WeightParentTask float64 `json:"weightParentTask"`

	GenerationNumber int     `json:"generationNumber"`
	PopulationSize   int     `json:"populationSize"`
	MutationRate     float64 `json:"mutationRate"`
	ElitismRate      float64 `json:"elitismRate"`
}

type ApiResponse struct {
	Days []Day `json:"days"`
}

type Task struct {
	Title           string    `json:"title"`
	Deadline        time.Time `json:"deadline"`
	Difficulty      int       `json:"difficulty"`
	Priority        int       `json:"priority"`
	ParentTaskTitle string    `json:"parentTaskTitle"`
}

type Day struct {
	Tasks []Task `json:"tasks"`
}

type Schedule struct {
	Genes                   []Day     `json:"days"`
	ScheduleStartDate       time.Time `json:"scheduleStartDate"`
	ScheduleEndDate         time.Time `json:"scheduleEndDate"`
	Tasks                   []Task    `json:"tasks"`
	IsDeadlineMustMeet      bool      `json:"isDeadlineMustMeet"`
	IsParentTaskMustMeet    bool      `json:"isParentTaskMustMeet"`
	IndividualInsertChance  float64   `json:"individualInsertChance"`
	DayAmount               int       `json:"dayAmount"`
	AverageDifficultyPerDay float64   `json:"averageDifficultyPerDay"`

	WeightPriority         float64 `json:"weightPriority"`
	WeightDifficulty       float64 `json:"weightDifficulty"`
	WeightDeadline         float64 `json:"weightDeadline"`
	WeightParentTask       float64 `json:"weightParentTask"`
	PriorityContribution   float64 `json:"priorityContribution"`
	DifficultyContribution float64 `json:"difficultyContribution"`
	DeadlineContribution   float64 `json:"deadlineContribution"`
	ParentTaskContribution float64 `json:"parentTaskContribution"`
}

const MINIMUM_FITNESS = 0.01

func main() {
	http.HandleFunc("/schedule", handlePostRequest)
	http.HandleFunc("/schedule/fitness", handleScheduleFitnessCalculatorRequest)
	err := http.ListenAndServe(":8084", nil)
	if err != nil {
		panic("http listen and serve err : " + err.Error())
	}
}

func handlePostRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Accept", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Encoding, Authorization, Content-Type, X-CSRF-Token")
	w.WriteHeader(http.StatusOK)

	decoder := json.NewDecoder(r.Body)
	var input ApiInput
	err := decoder.Decode(&input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	schedule := generateSchedule(input)

	// run genetic algorithm
	ga := src.NewCustomGA(input.GenerationNumber, input.PopulationSize, input.MutationRate, input.ElitismRate, schedule, ScheduleModel{})
	var bestSchedule *Schedule
	bestSchedule = ga.RunWithLog(printSchedule).(*Schedule)
	schJson, _ := json.Marshal(bestSchedule)
	os.WriteFile("schedule.json"+time.Now().String(), schJson, 0644)
	fmt.Println("Best Schedule fitness: ", bestSchedule.CalculateFitness())
	fmt.Println("Priority Contribution: ", bestSchedule.PriorityContribution)
	fmt.Println("Difficulty Contribution: ", bestSchedule.DifficultyContribution)
	fmt.Println("Deadline Contribution: ", bestSchedule.DeadlineContribution)
	fmt.Println("Parent Task Contribution: ", bestSchedule.ParentTaskContribution)

	fmt.Println("\n#################### End of request ####################\n")

	apiResponse := ApiResponse{Days: bestSchedule.Genes}
	err = json.NewEncoder(w).Encode(apiResponse)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}

func handleScheduleFitnessCalculatorRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Accept", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Encoding, Authorization, Content-Type, X-CSRF-Token")
	w.WriteHeader(http.StatusOK)

	decoder := json.NewDecoder(r.Body)
	var schedule Schedule
	err := decoder.Decode(&schedule)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fitness := schedule.CalculateFitness()
	fmt.Println("Priority Contribution: ", schedule.PriorityContribution)
	fmt.Println("Difficulty Contribution: ", schedule.DifficultyContribution)
	fmt.Println("Deadline Contribution: ", schedule.DeadlineContribution)
	fmt.Println("Parent Task Contribution: ", schedule.ParentTaskContribution)
	json.NewEncoder(w).Encode(fitness)
}

func (s *Schedule) CalculateFitness() float64 {
	s.PriorityContribution = 0.0
	s.DifficultyContribution = 0.0
	s.DeadlineContribution = 0.0
	s.ParentTaskContribution = 0.0
	var fitnessScore float64
	for dayIndex, day := range s.Genes {
		dayDate := s.ScheduleStartDate.AddDate(0, 0, dayIndex)
		difficultyForDay := 0
		dayTasksAmount := float64(len(day.Tasks))
		violateParentTaskAmount := 0.0
		distanceToEnd := math.Pow(float64(s.DayAmount-dayIndex)/float64(s.DayAmount), 2)
		for _, task := range day.Tasks {
			// calculate parent task violation
			if task.ParentTaskTitle != "" {
				parentDayIndex, err := s.findDayOfTaskByTitle(task.ParentTaskTitle)

				if s.IsParentTaskMustMeet && (err != nil || parentDayIndex > dayIndex) {
					return MINIMUM_FITNESS
				}

				if err != nil || parentDayIndex > dayIndex {
					violateParentTaskAmount++
				}
			}

			// punish not meeting deadline
			millisecondsExceedDeadline := dayDate.Sub(task.Deadline)
			daysExceedDeadline := int(millisecondsExceedDeadline.Hours() / 24)
			if daysExceedDeadline > 0 {
				daysExceedDeadline = int(math.Min(float64(daysExceedDeadline), 10))
				deadlineContribution := s.WeightDeadline * float64(daysExceedDeadline)
				fitnessScore -= deadlineContribution
				s.DeadlineContribution -= deadlineContribution
			} else if s.IsDeadlineMustMeet {
				return MINIMUM_FITNESS
			}

			difficultyForDay += task.Difficulty

			// place high priority task early in schedule
			priorityContribution := s.WeightPriority * float64(task.Priority) * distanceToEnd
			fitnessScore += priorityContribution
			s.PriorityContribution += priorityContribution
		}

		// punish if parent task is not scheduled before current task
		violateParentTaskAmount = math.Min(float64(violateParentTaskAmount), 10)
		parentTaskContribution := s.WeightParentTask * violateParentTaskAmount
		fitnessScore -= parentTaskContribution
		s.ParentTaskContribution -= parentTaskContribution

		// punish exceeding average difficulty
		if dayTasksAmount > 0 {
			dayAvgDifficulty := float64(difficultyForDay) / dayTasksAmount
			difficultyImpact := gaussianReward(float64(difficultyForDay), s.AverageDifficultyPerDay)
			difficultyContribution := s.WeightDifficulty * difficultyImpact * dayTasksAmount * dayAvgDifficulty
			fitnessScore += difficultyContribution
			s.DifficultyContribution += difficultyContribution
		}

	}

	if fitnessScore <= 0 {
		fitnessScore = MINIMUM_FITNESS
	}

	return fitnessScore
}

func (s *Schedule) GenerateIndividual() src.Individual {
	var localTasks []Task
	localTasks = append(localTasks, s.Tasks...)
	apiInput := populateApiInput(s)
	individual := generateSchedule(apiInput)
	for len(localTasks) > 0 {
		for i := 0; i < s.DayAmount && len(localTasks) > 0; i++ {
			if rand.Float64() < s.IndividualInsertChance {
				// insert randomly selected task to the day
				randomTaskIndex := rand.Intn(len(localTasks))
				individual.Genes[i].Tasks = append(individual.Genes[i].Tasks, localTasks[randomTaskIndex])

				// remove randomly selected task from whole tasks
				localTasks = append(localTasks[:randomTaskIndex], localTasks[randomTaskIndex+1:]...)
			}
		}
	}
	return individual
}

func generateSchedule(input ApiInput) *Schedule {
	scheduleStartDate := input.ScheduleStartDate
	scheduleEndDate := input.ScheduleEndDate
	tasks := input.Tasks
	isDeadlineMustMeet := input.IsDeadlineMustMeet
	isParentTaskMustMeet := input.IsParentTaskMustMeet

	weightPriority := input.WeightPriority
	weightDifficulty := input.WeightDifficulty
	weightDeadline := input.WeightDeadline
	weightParentTask := input.WeightParentTask

	duration := scheduleEndDate.Sub(scheduleStartDate)
	dayAmount := float64(duration.Hours() / 24)
	insertChance := 0.2
	totalDifficulty := sumDifficulty(tasks)
	averageDifficultyPerDay := totalDifficulty / dayAmount

	return &Schedule{
		Genes:                   make([]Day, int(dayAmount)),
		ScheduleStartDate:       scheduleStartDate,
		ScheduleEndDate:         scheduleEndDate,
		Tasks:                   tasks,
		IsDeadlineMustMeet:      isDeadlineMustMeet,
		IsParentTaskMustMeet:    isParentTaskMustMeet,
		IndividualInsertChance:  insertChance,
		DayAmount:               int(dayAmount),
		AverageDifficultyPerDay: float64(averageDifficultyPerDay),

		WeightPriority:         weightPriority,
		WeightDeadline:         weightDeadline,
		WeightDifficulty:       weightDifficulty,
		WeightParentTask:       weightParentTask,
		PriorityContribution:   0.0,
		DifficultyContribution: 0.0,
		DeadlineContribution:   0.0,
		ParentTaskContribution: 0.0,
	}
}

func populateApiInput(schedule *Schedule) ApiInput {
	return ApiInput{
		ScheduleStartDate:    schedule.ScheduleStartDate,
		ScheduleEndDate:      schedule.ScheduleEndDate,
		Tasks:                schedule.Tasks,
		IsDeadlineMustMeet:   schedule.IsDeadlineMustMeet,
		IsParentTaskMustMeet: schedule.IsParentTaskMustMeet,

		WeightPriority:   schedule.WeightPriority,
		WeightDifficulty: schedule.WeightDifficulty,
		WeightDeadline:   schedule.WeightDeadline,
		WeightParentTask: schedule.WeightParentTask,
	}
}

func printSchedule(individual src.Individual) {
	schedule := individual.(*Schedule)
	fmt.Println("------------------------------------------------------------------")
	fmt.Println("Fitness Score: ", schedule.CalculateFitness())
	fmt.Println("Priority Contribution: ", schedule.PriorityContribution)
	fmt.Println("Difficulty Contribution: ", schedule.DifficultyContribution)
	fmt.Println("Deadline Contribution: ", schedule.DeadlineContribution)
	fmt.Println("Parent Task Contribution: ", schedule.ParentTaskContribution)
	fmt.Println("------------------------------------------------------------------")
}
