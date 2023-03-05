
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class Solution {

    private List<Integer>[] graph;
    private int[] outdegree;
    private int numberOfCities;

    public long minimumFuelCost(int[][] roads, int seats) {
        numberOfCities = roads.length + 1;
        createGraph(roads);
        initializeArrayOutdegree(roads);
        return breadthFirstSearchForPathWithMinFuelCost(seats);
    }

    private long breadthFirstSearchForPathWithMinFuelCost(int seats) {
        Queue<Integer> queue = new LinkedList<>();
        initializeQueue(queue);
        int[] numberOfPassengers = new int[numberOfCities];
        Arrays.fill(numberOfPassengers, 1);
        long fuelCost = 0;

        while (!queue.isEmpty()) {
            int city = queue.poll();
            fuelCost += (int) Math.ceil((double) numberOfPassengers[city] / seats);

            List<Integer> neighbours = graph[city];
            for (int nextCity : neighbours) {
                numberOfPassengers[nextCity] += numberOfPassengers[city];
                if (nextCity != 0 && --outdegree[nextCity] == 1) {
                    queue.add(nextCity);
                }
            }
        }
        return fuelCost;
    }

    private void createGraph(int[][] roads) {
        graph = new ArrayList[numberOfCities];
        for (int i = 0; i < numberOfCities; ++i) {
            graph[i] = new ArrayList<>();
        }
        for (int[] road : roads) {
            graph[road[0]].add(road[1]);
            graph[road[1]].add(road[0]);
        }
    }

    private void initializeArrayOutdegree(int[][] roads) {
        outdegree = new int[numberOfCities];
        for (int[] road : roads) {
            ++outdegree[road[0]];
            ++outdegree[road[1]];
        }
    }

    private void initializeQueue(Queue<Integer> queue) {
        for (int city = 1; city < numberOfCities; ++city) {
            if (outdegree[city] == 1) {
                queue.add(city);
            }
        }
    }
}
