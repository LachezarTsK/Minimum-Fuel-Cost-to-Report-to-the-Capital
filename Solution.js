
/**
 * @param {number[][]} roads
 * @param {number} seats
 * @return {number}
 */
var minimumFuelCost = function (roads, seats) {
    this.numberOfCities = roads.length + 1;
    this.graph = Array.from(new Array(this.numberOfCities), () => new Array());
    createGraph(roads);

    this.outdegree = new Array(this.numberOfCities).fill(0);
    initializeArrayOutdegree(roads);

    return breadthFirstSearchForPathWithMinFuelCost(seats);
};

/**
 * @param {number} seats
 * @return {number}
 */
function breadthFirstSearchForPathWithMinFuelCost(seats) {
    //const {Queue} = require('@datastructures-js/queue');
    const queue = new Queue();//Queue<number>
    initializeQueue(queue);
    const numberOfPassengers = new Array(this.numberOfCities).fill(1);
    let fuelCost = 0;

    while (!queue.isEmpty()) {
        let city = queue.dequeue();
        fuelCost += Math.ceil(numberOfPassengers[city] / seats);

        const neighbours = this.graph[city];
        for (let nextCity of neighbours) {
            numberOfPassengers[nextCity] += numberOfPassengers[city];
            if (nextCity !== 0 && --this.outdegree[nextCity] === 1) {
                queue.enqueue(nextCity);
            }
        }
    }
    return fuelCost;
}

/**
 * @param {number[][]} roads
 * @return {void}
 */
function createGraph(roads) {
    for (let road of roads) {
        this.graph[road[0]].push(road[1]);
        this.graph[road[1]].push(road[0]);
    }
}

/**
 * @param {number[][]} roads
 * @return {void}
 */
function initializeArrayOutdegree(roads) {
    for (let road of roads) {
        ++this.outdegree[road[0]];
        ++this.outdegree[road[1]];
    }
}

/**
 * @param {Queue<number>} queue
 * @return {void}
 */
function initializeQueue(queue) {
    for (let city = 1; city < this.numberOfCities; ++city) {
        if (this.outdegree[city] === 1) {
            queue.enqueue(city);
        }
    }
}
