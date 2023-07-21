import { CheckCircle, XCircle } from "lucide-react";
import { Items } from "./types";
export const Result = ({
  data,
  result,
}: {
  data: Items;
  result: Map<string, string>;
}) => {
  return (
    <div className="border border-input p-6 rounded-md shadow divide-dashed divide-y ">
      {data.map((item) => {
        const userAnswer = result.get(item.setup);
        const isAnswerCorrect = userAnswer === item.punchline;
        return (
          <div key={item.setup} className=" p-2 text-center space-y-2">
            <div className="font-base font-medium">{item.setup}</div>
            <div className="flex justify-center text-sm">
              {isAnswerCorrect ? (
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1.5 text-green-600" />
                  {userAnswer}
                </div>
              ) : (
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center">
                    <XCircle className="w-4 h-4 mr-1.5 text-red-600" />
                    <div className="line-through">{userAnswer}</div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1.5 text-green-600" />
                    {item.punchline}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
