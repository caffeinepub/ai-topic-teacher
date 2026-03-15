import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type ChatMessage = {
    role : Text;
    message : Text;
  };

  module ChatMessage {
    public func compare(a : ChatMessage, b : ChatMessage) : Order.Order {
      switch (a.message.compare(b.message)) {
        case (#equal) { a.role.compare(b.role) };
        case (ordering) { ordering };
      };
    };
  };

  let chatHistories = Map.empty<Text, [ChatMessage]>();
  let topics = Map.empty<Text, Text>();

  public shared ({ caller }) func registerPhone(phone : Text) : async Bool {
    chatHistories.add(phone, []);
    true;
  };

  public shared ({ caller }) func setTopic(phone : Text, topic : Text) : async () {
    let validTopics = ["Movies", "Games", "Adventure", "Dinosaurs", "Fighting", "Riding"];
    let isValid = validTopics.any(func(t) { t == topic });
    if (not isValid) { Runtime.trap("Invalid topic chosen."); };
    topics.add(phone, topic);
  };

  public query ({ caller }) func getChatHistory(phone : Text) : async [ChatMessage] {
    switch (chatHistories.get(phone)) {
      case (null) { Runtime.trap("No chat history found for this phone."); };
      case (?history) { history };
    };
  };

  public shared ({ caller }) func sendMessage(phone : Text, message : Text) : async Text {
    var aiResponse = "Let's learn together!";
    switch (topics.get(phone)) {
      case (?topic) {
        aiResponse := getTopicResponse(topic, message);
      };
      case (null) { aiResponse := "Please select a topic first."; };
    };

    let userMsg : ChatMessage = {
      role = "user";
      message;
    };
    let aiMsg : ChatMessage = {
      role = "ai";
      message = aiResponse;
    };

    switch (chatHistories.get(phone)) {
      case (?history) {
        chatHistories.add(phone, history.concat([userMsg, aiMsg]));
      };
      case (null) {
        chatHistories.add(phone, [userMsg, aiMsg]);
      };
    };
    aiResponse;
  };

  func getTopicResponse(topic : Text, message : Text) : Text {
    switch (topic) {
      case ("Movies") {
        let responses = [
          "Did you know the first movie was made in 1888?",
          "Steven Spielberg directed Jaws. It's a classic!",
          "Movies are told in frames per second. About 24 per second in theaters.",
          "Genres like action, comedy, and drama help categorize movies.",
          "Editing is a crucial part of movie making.",
          "Alfred Hitchcock was known as the master of suspense.",
          "Color movies started becoming popular in the 1930s.",
          "The Oscars are a famous movie awards ceremony."
        ];
        getSpecificResponse(responses, message);
      };
      case ("Games") {
        let responses = [
          "Video games started in the 1970s. Pong was a classic.",
          "Mario is a famous video game character.",
          "Games involve design, graphics, and programming.",
          "Multiplayer games connect people worldwide.",
          "Different consoles run different types of games.",
          "Board games help develop strategic thinking.",
          "Puzzle games sharpen the mind.",
          "Sports simulations are popular game genres."
        ];
        getSpecificResponse(responses, message);
      };
      case ("Adventure") {
        let responses = [
          "Adventure is about exploration and learning.",
          "Famous explorers include Columbus and Marco Polo.",
          "Adventures can be as simple as trying a new food.",
          "Survival skills are part of adventure stories.",
          "Reading books can be an adventure for the mind.",
          "Nature exploration teaches us about the environment.",
          "Teamwork is often essential in real life adventures.",
          "Facing fears can be a personal adventure."
        ];
        getSpecificResponse(responses, message);
      };
      case ("Dinosaurs") {
        let responses = [
          "Dinosaurs lived millions of years ago.",
          "The Tyrannosaurus rex is a famous carnivore.",
          "Herbivores like Triceratops ate plants.",
          "Dinosaurs were wiped out by a major extinction event.",
          "Fossils are how we learn about dinosaurs.",
          "Paleontology is the study of ancient life.",
          "There were huge dinosaurs and small ones.",
          "Not all reptiles from that time were dinosaurs."
        ];
        getSpecificResponse(responses, message);
      };
      case ("Fighting") {
        let responses = [
          "Martial arts teach discipline and respect.",
          "Karate originated in Japan.",
          "Boxing matches have strict rules.",
          "Fighting is also about strategy.",
          "Self-defense skills build confidence.",
          "Many sports involve controlled fighting techniques.",
          "Famous fighters trained for years.",
          "Safety is the most important thing in any fight."
        ];
        getSpecificResponse(responses, message);
      };
      case ("Riding") {
        let responses = [
          "Horse riding is a centuries-old activity.",
          "Motorcycles and cars also use the term 'riding'.",
          "Safety gear is essential for riding.",
          "Bicycles are great for exercise.",
          "Saddle types vary by riding style.",
          "Riding teaches balance and control.",
          "Racing is a type of competitive riding.",
          "Horses have been used for travel and work."
        ];
        getSpecificResponse(responses, message);
      };
      case (_) { "I'm here to help you learn!" };
    };
  };

  func getSpecificResponse(responses : [Text], message : Text) : Text {
    if (message.contains(#text "fact")) {
      responses[0];
    } else if (message.contains(#text "how") or message.contains(#text "why")) {
      responses[1];
    } else {
      responses[2];
    };
  };
};
