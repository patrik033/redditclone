import { View, Text, Image, Pressable, FlatList } from "react-native";
import { Entypo, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { formatDistanceToNowStrict, isSameHour } from 'date-fns';
import { Comment } from "../types";
import { useState, memo } from "react";

type CommentListItemProps = {
  comment: Comment;
  depth: number;
  onReply: (commentId: string) => void;
}


console.log("CommentListItem rendered")
const CommentListItem = ({ comment, depth, onReply }: CommentListItemProps) => {

  const [isShowReplies, setIsShowReplies] = useState<boolean>(false);


  return (
    <View
      style={{
        backgroundColor: "white",
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        gap: 10,
        borderLeftColor: "#E5E7EB",
        borderLeftWidth: depth > 0 ? 1 : 0,
      }}
    >
      {/* User Info */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
        <Image
          source={{
            uri: comment.user.image || "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
          }}
          style={{ width: 28, height: 28, borderRadius: 15, marginRight: 4 }}
        />
        <Text style={{ fontWeight: "600", color: "#737373", fontSize: 13 }}>{comment.user.name}</Text>
        <Text style={{ color: "#737373", fontSize: 13 }}>&#x2022;</Text>
        <Text style={{ color: "#737373", fontSize: 13 }}>
          {formatDistanceToNowStrict(new Date(comment.created_at))}
        </Text>
      </View>

      {/* Comment Content */}
      <Text>{comment.comment}</Text>

      {/* Comment Actions */}
      <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 14 }}>
        <Entypo name="dots-three-horizontal" size={15} color="#737373" />
        <Octicons name="reply" size={16} color="#737373" onPress={() => onReply(comment.id)} />
        <MaterialCommunityIcons name="trophy-outline" size={16} color="#737373" />
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <MaterialCommunityIcons name="arrow-up-bold-outline" size={18} color="#737373" />
          <Text style={{ fontWeight: "500", color: "#737373" }}>{comment.upvotes}</Text>
          <MaterialCommunityIcons name="arrow-down-bold-outline" size={18} color="#737373" />
        </View>
      </View>

      {/* Show Replies */}
      {(!!comment.replies.length && !isShowReplies && depth < 5) && (

        <Pressable style={{ backgroundColor: "#EDEDED", borderRadius: 2, paddingVertical: 3, alignItems: "center", gap: 5 }} onPress={() => setIsShowReplies(true)}>
          <Text style={{ color: "#737373", fontSize: 12, letterSpacing: 0.5, fontWeight: "500", alignSelf: "center" }}>Show Replies</Text>
          <MaterialCommunityIcons name="chevron-down" size={16} color="#545454" />
        </Pressable>
      )}

      {/* Replies */}
      {/*isShowReplies && (
        //<FlatList
          //data={comment.replies}
          //renderItem={({ item }) => (
            //<CommentListItem
              //comment={item}
              //depth={depth + 1}
              //onReply={onReply}
            ///>
          //)}
          //keyExtractor={(item) => item.id.toString()}
          //contentContainerStyle={{ paddingLeft: 20 }}
        ///>
      //)}*/}

      {isShowReplies && (
        comment.replies.map((reply) => (
          <CommentListItem
            key={reply.id}
            comment={reply}
            depth={depth + 1}
            onReply={onReply}
          />
        ))
      )}
    </View>

  )
};

export default memo(CommentListItem);