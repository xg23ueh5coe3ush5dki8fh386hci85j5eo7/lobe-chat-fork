import { CreateTopicParams, QueryTopicParams, TopicModel } from '@/database/models/topic';
import { ChatTopic } from '@/types/topic';

class TopicService {
  async createTopic(params: CreateTopicParams): Promise<string> {
    const item = await TopicModel.create(params);

    if (!item) {
      throw new Error('topic create Error');
    }

    return item.id;
  }

  async getTopics(params: QueryTopicParams): Promise<ChatTopic[]> {
    console.time('getTopic');

    const topics = await TopicModel.query(params);

    console.timeEnd('getTopic');

    return topics;
  }

  async removeTopic(id: string) {
    return TopicModel.delete(id);
  }

  async removeTopics(sessionId: string) {
    return TopicModel.batchDeleteBySessionId(sessionId);
  }

  async batchRemoveTopics(topics: string[]) {
    return TopicModel.batchDelete(topics);
  }

  async removeAllTopic() {
    return TopicModel.clearTable();
  }

  async updateFavorite(id: string, newState?: boolean) {
    return TopicModel.toggleFavorite(id, newState);
  }

  async batchCreateTopics(importTopics: ChatTopic[]) {
    return TopicModel.batchCreate(importTopics as any);
  }

  updateTitle(topicId: string, text: string) {
    return TopicModel.update(topicId, { title: text });
  }
}

export const topicService = new TopicService();
