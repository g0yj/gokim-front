import { Issue } from "../../types/board";
import { DraggableProvided } from "react-beautiful-dnd";

const IssueCard = ({
  issue,
  provided,
}: {
  issue: Issue;
  provided: DraggableProvided;
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="border p-2 rounded shadow-sm"
    >
      <div className="bg-gray-100 p-3 rounded shadow-sm hover:bg-gray-200 cursor-pointer">
        <h3 className="font-medium">{issue.content}</h3>
      </div>
    </div>
  );
};

export default IssueCard;
