
#include <cmath>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    vector<vector<int>> graph;
    vector<int> outdegree;
    size_t numberOfCities;

public:
    long long minimumFuelCost(const vector<vector<int>>& roads, int seats) {
        numberOfCities = roads.size() + 1;
        createGraph(roads);
        initializeArrayOutdegree(roads);
        return breadthFirstSearchForPathWithMinFuelCost(seats);
    }

private:
    long long breadthFirstSearchForPathWithMinFuelCost(int seats) {
        queue<int> queue;
        initializeQueue(queue);
        vector<int> passengers(numberOfCities, 1);
        long long fuelCost = 0;

        while (!queue.empty()) {
            int city = queue.front();
            queue.pop();
            fuelCost += ceil(static_cast<double> (passengers[city]) / seats);

            const vector<int>& neighbours = graph[city];
            for (int nextCity : neighbours) {
                passengers[nextCity] += passengers[city];
                if (nextCity != 0 && --outdegree[nextCity] == 1) {
                    queue.push(nextCity);
                }
            }
        }
        return fuelCost;
    }

    void createGraph(const vector<vector<int>>& roads) {
        graph.resize(numberOfCities);
        for (const auto& road : roads) {
            graph[road[0]].push_back(road[1]);
            graph[road[1]].push_back(road[0]);
        }
    }

    void initializeArrayOutdegree(const vector<vector<int>>& roads) {
        outdegree.resize(numberOfCities);
        for (const auto& road : roads) {
            ++outdegree[road[0]];
            ++outdegree[road[1]];
        }
    }

    void initializeQueue(queue<int>& queue) {
        for (int city = 1; city < numberOfCities; ++city) {
            if (outdegree[city] == 1) {
                queue.push(city);
            }
        }
    }
};
