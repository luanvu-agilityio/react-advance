import styled from 'styled-components'

export const TabsContainer = styled.div`
  margin-bottom: 2rem;
`

export const TabCount = styled.span`
  font-size: 12px;
  background-color: var(--green-shade-4);
  padding: 0 8px;
  border-radius: 12px;
  color: var(--green-color-default);
`

export const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: var(--font-size-medium);
  margin-bottom: 0.75rem;
`

export const SectionText = styled.p`
  font-family: var(--font-family-secondary);
  font-size: 14px;
  font-weight: var(--font-size-regular);
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  display: table;
`

export const TableHead = styled.thead`
  border-bottom: 1px solid #fdfdfd;
  display: table-header-group;

  tr {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`

export const TableRow = styled.tr`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

export const TableHeader = styled.th`
  text-align: left;
  padding: 7px 0;
  color: var(--black-color-default);
  font-weight: var(--font-weight-semibold);
  font-size: 12px;
`

export const TableCell = styled.td`
  padding: 10.5px 0;
  color: var(--black-shade-1);
  font-size: 14px;
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-regular);
`

export const ReviewItem = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

export const ReviewAuthor = styled.div`
  font-weight: 500;
  font-size: 12px;
  font-weight: var(--font-weight-medium);
`

export const ReviewDate = styled.div`
  font-size: 12px;
  color: var(--black-shade-3);
`

export const QuestionItem = styled.div`
  border-bottom: 1px solid var(--black-shade-2);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`

export const QuestionTitle = styled.div`
  font-weight: var(--font-weight-medium);
  font-size: 14px;
  margin-bottom: 0.5rem;
`

export const QuestionAnswer = styled.p`
  margin-bottom: 0.5rem;
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  opacity: 0.7;
`

export const QuestionMeta = styled.div`
  font-size: 12px;
  font-family: var(--font-family-secondary);
  color: var(--black-shade-1);
`
