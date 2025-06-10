import { Button, Modal } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/store";
import AddEvent from "./AddEvent";
import { eventAction } from "./event.slice";
import EventTable from "./EventTable";

const Events = () => {
  const dispatch = useAppDispatch();
  const { isCreateEvent } = useAppSelector((state) => state.event);
  const { setCreateEventModalVisibility } = eventAction;
  return (
    <>
      <div className="flex flex-row justify-end">
        <Button
          variant="primary"
          type="button"
          className="bg-[#8e002e] flex w-40 mt-7 font-[600] text-[16px] cursor-pointer justify-center rounded-md  text-sm/6 font-open-sans text-white shadow-xs "
        >
          Logout
        </Button>
        <div className="ml-5">
          <Button
            variant="primary"
            type="button"
            onClick={() => dispatch(setCreateEventModalVisibility(true))}
            className="bg-[#8e002e] flex w-40 mt-7 font-[600] text-[16px] cursor-pointer justify-center rounded-md  text-sm/6 font-open-sans text-white shadow-xs "
          >
            Add Event
          </Button>
        </div>
      </div>
      <h2 className="text-xl font-bold ">Event List</h2>
      <EventTable data={[]} />
      <Modal
        isOpen={isCreateEvent}
        close={() => dispatch(setCreateEventModalVisibility(false))}
        title="Add Event"
        element={<AddEvent />}
        size="xl"
      />
    </>
  );
};

export default Events;
