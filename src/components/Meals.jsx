import Meal from "./meal";
import { fetchMeals } from "./fetchCalls";
import { useFetch } from "../hooks/useFetch";
export default function Meals() {
  const {
    isFetching,
    errorMessage,
    fetchedData: mealsData,
  } = useFetch(fetchMeals, []);
  return (
    <div id="meals">
      {isFetching || errorMessage ? (
        errorMessage ? (
          <div className="error">{errorMessage.message} </div>
        ) : (
          <p className="center">Fetching Meals.. Please Wait.. 😊 </p>
        )
      ) : (
        mealsData.map((meal) => <Meal key={meal.id} meal={meal} />)
      )}
    </div>
  );
}
