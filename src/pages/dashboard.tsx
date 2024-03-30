import { Container, Stack } from '@mantine/core';
import Hack from '~/components/Hack';
import { api } from '~/utils/api';

export default function Home() {
  const { data: hacks } = api.hacks.getAll.useQuery();
  return (
    <Container mt="lg">
      <Stack gap="sm">
        {hacks?.map((hack) => <Hack key={hack.id} hack={hack} />)}
      </Stack>
    </Container>
  );
}
