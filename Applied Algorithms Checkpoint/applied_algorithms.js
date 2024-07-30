function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const priorityQueue = new PriorityQueue();

    // Initialize distances
    for (const vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    // Add the start vertex to the priority queue
    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {
        const { vertex, priority } = priorityQueue.dequeue();

        if (!visited.has(vertex)) {
            visited.add(vertex);

            for (const neighbor in graph[vertex]) {
                const weight = graph[vertex][neighbor];
                const newDist = distances[vertex] + weight;

                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                    priorityQueue.enqueue(neighbor, newDist);
                }
            }
        }
    }

    return distances;
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(vertex, priority) {
        this.queue.push({ vertex, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

// Example usage:
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

const shortestPaths = dijkstra(graph, 'A');
console.log(shortestPaths);
